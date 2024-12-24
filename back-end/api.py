from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load game data CSV file into a Pandas DataFrame


def load_csv(file_path):
    try:
        return pd.read_csv(file_path)
    except Exception as e:
        print(f"Error loading data from {file_path}: {e}")
        return None


@app.route('/api/games/<team_abbr>', methods=['GET'])
def get_team_games(team_abbr):
    file_path = 'data/games.csv'  # Replace with the path to your game data CSV
    game_data = load_csv(file_path)
    if game_data is None:
        return jsonify({'error': 'Failed to load game data'}), 500

    # Filter games for the given team
    filtered_games = game_data[
        (game_data['homeTeamAbbr'] == team_abbr) | (
            game_data['visitorTeamAbbr'] == team_abbr)
    ]

    # Prepare the response
    games = filtered_games.to_dict(orient='records')
    return jsonify(games)


@app.route('/api/game-overview/<int:gameId>', methods=['GET'])
def get_game_overview(gameId):
    # Load game-level data
    game_data = load_csv('data/games.csv')

    if game_data is None:
        return jsonify({'error': 'Failed to load game data'}), 500

    game = game_data[game_data['gameId'] == gameId]

    if game.empty:
        return jsonify({'error': 'Game not found'}), 404

    return jsonify({
        'game': game.iloc[0].to_dict(),
    })


@app.route('/api/game-analysis/<int:gameId>', methods=['GET'])
def analyze_game(gameId):
    game_data = load_csv('data/games.csv')
    if game_data is None:
        return jsonify({'error': 'Failed to load game data'}), 500

    game = game_data[game_data['gameId'] == gameId]

    if game.empty:
        return jsonify({'error': 'Game not found'}), 404

    week = game.iloc[0]['week']

    tracking_data = load_csv(f'data/tracking_week_{week}.csv')
    if tracking_data is None:
        return jsonify({'error': 'Failed to load tracking data'}), 500

    # Filter pre-snap frames
    pre_snap = tracking_data[tracking_data['frameType'] == 'BeforeSnap']

    # Example: Count pre-snap motions
    pre_snap_motions = pre_snap.groupby('nflId')['x', 'y'].std().reset_index()
    pre_snap_motions['motion_detected'] = pre_snap_motions.apply(
        lambda row: row['x'] > 1.5 or row['y'] > 1.5, axis=1)

    return jsonify(pre_snap_motions.to_dict(orient='records'))


@app.route('/api/game-penalties/<int:gameId>', methods=['GET'])
def analyze_penalties(gameId):
    play_data = load_csv('play_data.csv')
    if play_data is None:
        return jsonify({'error': 'Failed to load play data'}), 500

    penalties = play_data[(play_data['gameId'] == gameId) & (
        play_data['playNullifiedByPenalty'] == 'Y')]

    return jsonify(penalties.to_dict(orient='records'))


if __name__ == '__main__':
    app.run(debug=True)

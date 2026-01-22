from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Simulated database file (you can replace with a real database later)
ORDERS_FILE = 'orders.json'

def load_orders_from_storage():
    """Load orders from JSON file or return empty list"""
    try:
        with open(ORDERS_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_orders_to_storage(orders):
    """Save orders to JSON file"""
    with open(ORDERS_FILE, 'w') as f:
        json.dump(orders, f, indent=2)

@app.route('/api/orders', methods=['GET'])
def get_orders():
    """Fetch all orders"""
    orders = load_orders_from_storage()
    return jsonify({
        'success': True,
        'orders': orders,
        'count': len(orders)
    })

@app.route('/api/orders', methods=['POST'])
def add_order():
    """Add a new order"""
    try:
        data = request.get_json()
        orders = load_orders_from_storage()
        
        # Add order to list
        orders.append(data)
        save_orders_to_storage(orders)
        
        return jsonify({
            'success': True,
            'message': 'Order added successfully',
            'orders': orders
        }), 201
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400

@app.route('/api/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    """Delete an order by index"""
    try:
        orders = load_orders_from_storage()
        
        if order_id < 0 or order_id >= len(orders):
            return jsonify({
                'success': False,
                'message': 'Order not found'
            }), 404
        
        orders.pop(order_id)
        save_orders_to_storage(orders)
        
        return jsonify({
            'success': True,
            'message': 'Order deleted successfully',
            'orders': orders
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'Server is running',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

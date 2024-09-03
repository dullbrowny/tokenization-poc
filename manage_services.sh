#!/bin/bash

# Function to stop the services
stop_services() {
    echo "Stopping React frontend..."
    pkill -f "npm start" 2>/dev/null && echo "React frontend stopped."

    echo "Stopping Flask backend..."
    pkill -f "python backend/wsgi.py" 2>/dev/null && echo "Flask backend stopped."

    echo "Stopping Stripe mock..."
    pkill -f "stripe-mock" 2>/dev/null && echo "Stripe mock stopped."
}

# Function to start the services
start_services() {
    echo "Starting Stripe mock..."
    stripe-mock &>/dev/null &

    echo "Starting Flask backend..."
    source ./venv/bin/activate && python backend/wsgi.py &>/dev/null &

    echo "Starting React frontend..."
    cd frontend && npm start &>/dev/null &
}

# Function to restart the services
restart_services() {
    stop_services
    sleep 2
    start_services
}

# Command line arguments handling
case "$1" in
    start)
        echo "Starting all services..."
        start_services
        ;;
    stop)
        echo "Stopping all services..."
        stop_services
        ;;
    restart)
        echo "Restarting all services..."
        restart_services
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac

exit 0


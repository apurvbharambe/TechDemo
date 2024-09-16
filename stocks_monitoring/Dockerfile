# Stage 1: Build Stage (for building dependencies)
FROM python:3.10-alpine as build-stage

# Install system dependencies needed for Python packages
RUN apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    libpq-dev \
    mariadb-connector-c-dev

# Upgrade pip
RUN pip install --upgrade pip

# Set the working directory
WORKDIR /app

# Copy the requirements file and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Final Stage (copy only what is needed)
FROM python:3.10-alpine

# Set the working directory in the container
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache mariadb-connector-c

# Copy only the installed dependencies from build-stage
COPY --from=build-stage /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=build-stage /usr/local/bin /usr/local/bin

# Copy the application code
COPY . .

# Set environment variables (if necessary)
ENV PYTHONUNBUFFERED=1

# Make migrations and start the Django server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]






# Use the official Python image from the Docker Hub
# FROM python:3.10-slim

# # Set the working directory in the container
# WORKDIR /app

# # Install system dependencies needed for Python packages
# RUN apt-get update \
#     && apt-get install -y --no-install-recommends \
#     gcc \
#     libpq-dev \
#     pkg-config \
#     default-libmysqlclient-dev \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*

# # Upgrade pip
# RUN pip install --upgrade pip

# # Copy the requirements file into the container
# COPY requirements.txt .


# # Install Python dependencies
# RUN pip install -r requirements.txt

# # Copy the rest of the application code into the container
# COPY . .

# # Make migrations and start the Django server

# CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]









# # Use the official Python image
# FROM python:3.10

# # Set the working directory
# WORKDIR /app

# # Install dependencies
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the application code
# COPY . .

# # Expose the port the app runs on
# EXPOSE 8000

# # Run the application
# CMD ["gunicorn", "--bind","0.0.0.0:8000", "stocks_monitoring.wsgi:application"]

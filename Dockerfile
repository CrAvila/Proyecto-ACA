# Use a base image with both Node.js and Python
FROM python:3.9

# Install Node.js
RUN apt-get update && apt-get install -y nodejs npm

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy requirements.txt and install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application to the container
COPY . .

# Expose the ports for the Node.js app and the Python API
EXPOSE 3000 5000

# Command to run both the Node.js app and the Python API
CMD ["sh", "-c", "npm run dev & python src/api/app.py"]

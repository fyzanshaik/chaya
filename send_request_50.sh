#!/bin/bash

# Base Aadhar number
base_aadhar=123456789012

# Number of requests
num_requests=50

# Initialize total time
total_time=0

# Loop to send 50 POST requests
for ((i=1; i<=num_requests; i++))
do
  # Calculate unique Aadhar number
  aadharNumber=$((base_aadhar + i))

  # Start time for the current request
  start_time=$(date +%s.%N)

  # Send the POST request using curl
  curl -X POST http://localhost:3000/api/farmer \
    -F "farmerName=John Doe" \
    -F "relationship=Owner" \
    -F "gender=Male" \
    -F "community=Local" \
    -F "aadharNumber=$aadharNumber" \
    -F "state=California" \
    -F "district=Los Angeles" \
    -F "mandal=Central" \
    -F "village=Downtown" \
    -F "panchayath=City Hall" \
    -F "dateOfBirth=1990-01-01" \
    -F "age=33" \
    -F "contactNumber=1234567890" \
    -F "accountNumber=987654321" \
    -F "ifscCode=ABCD1234567" \
    -F "branchName=Main Branch" \
    -F "address=123 Main St" \
    -F "bankName=Example Bank" \
    -F "bankCode=EXBK123" \
    -F "fields=[{\"surveyNumber\":\"123\",\"areaHa\":2.5,\"yieldEstimate\":10.5,\"locationX\":34.05,\"locationY\":-118.25}]" \
    -F "profilePic=@pp.png" \
    -F "aadhar=@blank.pdf" \
    -F "land=@blank.pdf" \
    -F "bank=@blank.pdf"

  # End time for the current request
  end_time=$(date +%s.%N)

  # Calculate time taken for the current request
  time_taken=$(echo "$end_time - $start_time" | bc)

  # Add to total time
  total_time=$(echo "$total_time + $time_taken" | bc)

  # Print status
  echo "Request $i sent with Aadhar Number: $aadharNumber | Time taken: ${time_taken}s"
done

# Print total time
echo "All requests completed!"
echo "Total time taken: ${total_time}s"

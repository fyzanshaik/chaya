#!/bin/bash

# Base Aadhar number
base_aadhar=123456789012

# Number of requests
num_requests=50

# Number of concurrent requests
concurrency=10

# Function to send a single request
send_request() {
  local aadharNumber=$1
  local request_num=$2

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

  # Print status
  echo "Request $request_num sent with Aadhar Number: $aadharNumber | Time taken: ${time_taken}s"
}

# Export the function so it can be used by parallel
export -f send_request

# Generate a list of Aadhar numbers and request numbers
aadhar_numbers=()
request_numbers=()
for ((i=1; i<=num_requests; i++))
do
  aadhar_numbers+=($((base_aadhar + i)))
  request_numbers+=($i)
done

# Use xargs to send requests concurrently
printf "%s\n" "${aadhar_numbers[@]}" | xargs -n 1 -P $concurrency -I {} bash -c 'send_request "$1" "$2"' _ {} ${request_numbers[@]}

# Print completion message
echo "All requests completed!"

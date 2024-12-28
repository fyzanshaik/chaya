GET /api/farmers

Fetches paginated list of farmers Query params: page, limit

POST /api/farmers

Creates a new farmer record Handles file uploads to Supabase storage Validates data using Zod schemas

GET /api/farmers/[id]

Fetches a specific farmer's details

PUT /api/farmers/[id]

Updates a farmer's record Handles file updates

DELETE /api/farmers/[id]

Deletes a farmer's record

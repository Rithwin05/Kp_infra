#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Build a high-end, classic and luxurious high-conversion real estate website for KP Infra Projects (Telangana) inspired by Prestige Constructions and Googee Properties. Brand: navy #0B1F35 + gold #D4AF37, fonts Playfair Display / Inter / Montserrat. Sections: Hero, Trust counters, Featured Projects (HMDA/DTCP/Farm Lands/Villas filterable), Why KP (timeline), Testimonials, Investment Calculator, Schedule Site Visit, Blogs, CTA, Footer, WhatsApp + sticky CTAs."

backend:
  - task: "Health endpoint /api/health"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Returns service status JSON."
        - working: true
          agent: "testing"
          comment: "TESTED: Returns correct {status:'ok', service:'KP Infra API', time:<iso>}. Status 200. All fields present and valid."
  - task: "POST /api/leads to capture leads"
    implemented: true
    working: false
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Inserts lead doc into MongoDB collection 'leads' with uuid, returns success+lead. Accepts name/phone/email/interest/project/message/source."
        - working: false
          agent: "testing"
          comment: "CRITICAL BUG: MongoDB _id field is leaking in POST response. When insertOne() is called, MongoDB adds _id to the object, then that object is returned with _id included. Response shows '_id':'6a3451a8f5f87e0067c00332'. Must exclude _id before returning. GET endpoint correctly excludes _id using projection. Data persistence works - lead created successfully with uuid."
  - task: "POST /api/visits to book a site visit"
    implemented: true
    working: false
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Inserts visit doc into 'visits' with date/time/project and pending status."
        - working: false
          agent: "testing"
          comment: "CRITICAL BUG: MongoDB _id field leaking in POST response. Same issue as leads endpoint. Response includes '_id':'6a3451a9f5f87e0067c00333'. Visit created successfully with uuid, status:'pending', all fields correct, but _id must be excluded."
  - task: "POST /api/brochure for brochure requests"
    implemented: true
    working: false
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Stores brochure request in 'brochure_requests'."
        - working: false
          agent: "testing"
          comment: "CRITICAL BUG: MongoDB _id field leaking in POST response. Response includes '_id':'6a3451a9f5f87e0067c00334'. Brochure request created successfully with uuid and all fields, but _id must be excluded."
  - task: "POST /api/calculator to log calculator runs"
    implemented: true
    working: false
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Logs investment calculator inputs (investment, appreciation, years)."
        - working: false
          agent: "testing"
          comment: "CRITICAL BUG: MongoDB _id field leaking in POST response. Response includes '_id':'6a3451a9f5f87e0067c00335'. Calculator record created successfully with uuid and numeric fields parsed correctly, but _id must be excluded."
  - task: "GET /api/leads and /api/visits read endpoints"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Returns last 100 entries (projection excludes _id) sorted by createdAt desc."
        - working: true
          agent: "testing"
          comment: "TESTED: Both GET /api/leads and GET /api/visits work correctly. Projection {_id:0} successfully excludes MongoDB _id. Returns arrays with uuid id field. Data persistence verified - created records retrievable. Sorting by createdAt desc works."

frontend:
  - task: "Luxury homepage with hero, projects, calculator, forms"
    implemented: true
    working: "NA"
    file: "app/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Full single-page experience built. Verified hero renders with brand styling via screenshot."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus:
    - "POST /api/leads to capture leads"
    - "POST /api/visits to book a site visit"
    - "POST /api/brochure for brochure requests"
    - "POST /api/calculator to log calculator runs"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: "Implemented KP Infra luxury real estate site. Backend exposes catch-all /api routes for leads, visits, brochure, calculator + GET endpoints for leads/visits. Mongo DB name from process.env.DB_NAME (default kp_infra). Please test all POST endpoints with realistic payloads and GET endpoints, verify documents persist with uuid id and createdAt timestamps and that JSON does not leak Mongo _id."
    - agent: "testing"
      message: "BACKEND TESTING COMPLETE. Created comprehensive test suite with realistic Indian data (Rohit Sharma, Priya Patel, etc.). CRITICAL ISSUE FOUND: All POST endpoints (/api/leads, /api/visits, /api/brochure, /api/calculator) are leaking MongoDB _id field in responses. When insertOne() is called, MongoDB mutates the object by adding _id, then that same object is returned. FIX: Destructure and exclude _id before returning, e.g., 'const {_id, ...cleanLead} = lead; return json({success:true, lead:cleanLead})'. GET endpoints work correctly with projection. Health endpoint works. 404 handling works. Data persistence verified. Test file: /app/backend_test.py"

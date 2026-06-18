#!/usr/bin/env python3
"""
Backend API Test Suite for KP Infra Luxury Real Estate Site
Tests all API endpoints with realistic Indian data
"""

import requests
import json
from datetime import datetime, timedelta

# Base URL from .env
BASE_URL = "https://luxury-realty-hub-27.preview.emergentagent.com/api"

def print_response(test_name, response):
    """Print formatted response for debugging"""
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")
    print(f"Status Code: {response.status_code}")
    print(f"Response Body:")
    print(json.dumps(response.json(), indent=2))
    print(f"{'='*80}\n")

def test_health_endpoint():
    """Test 1: GET /api/health"""
    print("\n🔍 Testing Health Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        print_response("GET /api/health", response)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get('status') == 'ok', "Status should be 'ok'"
        assert data.get('service') == 'KP Infra API', "Service name mismatch"
        assert 'time' in data, "Time field missing"
        
        # Verify time is valid ISO format
        datetime.fromisoformat(data['time'].replace('Z', '+00:00'))
        
        print("✅ Health endpoint test PASSED")
        return True
    except Exception as e:
        print(f"❌ Health endpoint test FAILED: {str(e)}")
        return False

def test_create_lead():
    """Test 2: POST /api/leads with realistic Indian data"""
    print("\n🔍 Testing Create Lead Endpoint...")
    try:
        payload = {
            "name": "Rohit Sharma",
            "phone": "+91 98480 12345",
            "email": "rohit.sharma@example.com",
            "interest": "Luxury Villa",
            "project": "KP Emerald County",
            "message": "Interested in 4BHK villa with premium amenities",
            "source": "website"
        }
        
        response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print_response("POST /api/leads", response)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get('success') is True, "Success should be true"
        assert 'lead' in data, "Lead object missing"
        
        lead = data['lead']
        # Verify all fields are present
        assert 'id' in lead, "Lead ID missing"
        assert '_id' not in lead, "MongoDB _id should not be in response"
        assert lead.get('name') == payload['name'], "Name mismatch"
        assert lead.get('phone') == payload['phone'], "Phone mismatch"
        assert lead.get('email') == payload['email'], "Email mismatch"
        assert lead.get('interest') == payload['interest'], "Interest mismatch"
        assert lead.get('project') == payload['project'], "Project mismatch"
        assert lead.get('message') == payload['message'], "Message mismatch"
        assert lead.get('source') == payload['source'], "Source mismatch"
        assert 'createdAt' in lead, "CreatedAt missing"
        
        # Verify UUID format (basic check)
        assert len(lead['id']) == 36, "ID should be UUID format"
        assert lead['id'].count('-') == 4, "UUID should have 4 hyphens"
        
        print("✅ Create lead test PASSED")
        return lead['id']
    except Exception as e:
        print(f"❌ Create lead test FAILED: {str(e)}")
        return None

def test_create_visit():
    """Test 3: POST /api/visits with realistic Indian data"""
    print("\n🔍 Testing Create Visit Endpoint...")
    try:
        # Schedule visit for next week
        visit_date = (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d')
        
        payload = {
            "name": "Priya Patel",
            "phone": "+91 99999 88888",
            "email": "priya.patel@example.com",
            "project": "KP Emerald County",
            "date": visit_date,
            "time": "11:00 AM",
            "notes": "Interested in corner plot with park view"
        }
        
        response = requests.post(f"{BASE_URL}/visits", json=payload, timeout=10)
        print_response("POST /api/visits", response)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get('success') is True, "Success should be true"
        assert 'visit' in data, "Visit object missing"
        
        visit = data['visit']
        # Verify all fields
        assert 'id' in visit, "Visit ID missing"
        assert '_id' not in visit, "MongoDB _id should not be in response"
        assert visit.get('name') == payload['name'], "Name mismatch"
        assert visit.get('phone') == payload['phone'], "Phone mismatch"
        assert visit.get('email') == payload['email'], "Email mismatch"
        assert visit.get('project') == payload['project'], "Project mismatch"
        assert visit.get('date') == payload['date'], "Date mismatch"
        assert visit.get('time') == payload['time'], "Time mismatch"
        assert visit.get('notes') == payload['notes'], "Notes mismatch"
        assert visit.get('status') == 'pending', "Status should be 'pending'"
        assert 'createdAt' in visit, "CreatedAt missing"
        
        # Verify UUID format
        assert len(visit['id']) == 36, "ID should be UUID format"
        
        print("✅ Create visit test PASSED")
        return visit['id']
    except Exception as e:
        print(f"❌ Create visit test FAILED: {str(e)}")
        return None

def test_brochure_request():
    """Test 4: POST /api/brochure"""
    print("\n🔍 Testing Brochure Request Endpoint...")
    try:
        payload = {
            "name": "Amit Kumar",
            "phone": "+91 88888 77777",
            "email": "amit.kumar@example.com",
            "project": "KP Emerald County"
        }
        
        response = requests.post(f"{BASE_URL}/brochure", json=payload, timeout=10)
        print_response("POST /api/brochure", response)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get('success') is True, "Success should be true"
        assert 'request' in data, "Request object missing"
        
        req = data['request']
        # Verify all fields
        assert 'id' in req, "Request ID missing"
        assert '_id' not in req, "MongoDB _id should not be in response"
        assert req.get('name') == payload['name'], "Name mismatch"
        assert req.get('phone') == payload['phone'], "Phone mismatch"
        assert req.get('email') == payload['email'], "Email mismatch"
        assert req.get('project') == payload['project'], "Project mismatch"
        assert 'createdAt' in req, "CreatedAt missing"
        
        # Verify UUID format
        assert len(req['id']) == 36, "ID should be UUID format"
        
        print("✅ Brochure request test PASSED")
        return req['id']
    except Exception as e:
        print(f"❌ Brochure request test FAILED: {str(e)}")
        return None

def test_calculator():
    """Test 5: POST /api/calculator"""
    print("\n🔍 Testing Calculator Endpoint...")
    try:
        payload = {
            "investment": 2500000,
            "appreciation": 14,
            "years": 7
        }
        
        response = requests.post(f"{BASE_URL}/calculator", json=payload, timeout=10)
        print_response("POST /api/calculator", response)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get('success') is True, "Success should be true"
        assert 'record' in data, "Record object missing"
        
        record = data['record']
        # Verify all fields
        assert 'id' in record, "Record ID missing"
        assert '_id' not in record, "MongoDB _id should not be in response"
        assert record.get('investment') == payload['investment'], "Investment mismatch"
        assert record.get('appreciation') == payload['appreciation'], "Appreciation mismatch"
        assert record.get('years') == payload['years'], "Years mismatch"
        assert 'createdAt' in record, "CreatedAt missing"
        
        # Verify UUID format
        assert len(record['id']) == 36, "ID should be UUID format"
        
        print("✅ Calculator test PASSED")
        return record['id']
    except Exception as e:
        print(f"❌ Calculator test FAILED: {str(e)}")
        return None

def test_get_leads(expected_lead_id):
    """Test 6: GET /api/leads"""
    print("\n🔍 Testing Get Leads Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/leads", timeout=10)
        print_response("GET /api/leads", response)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert 'leads' in data, "Leads array missing"
        assert isinstance(data['leads'], list), "Leads should be an array"
        
        # Verify no _id in any lead
        for lead in data['leads']:
            assert '_id' not in lead, f"MongoDB _id found in lead: {lead}"
            assert 'id' in lead, f"UUID id missing in lead: {lead}"
        
        # Verify our created lead is present
        if expected_lead_id:
            lead_ids = [lead['id'] for lead in data['leads']]
            assert expected_lead_id in lead_ids, f"Created lead {expected_lead_id} not found in GET response"
            
            # Find and verify the lead
            created_lead = next((l for l in data['leads'] if l['id'] == expected_lead_id), None)
            assert created_lead is not None, "Created lead not found"
            assert created_lead.get('name') == "Rohit Sharma", "Lead name mismatch"
            assert created_lead.get('project') == "KP Emerald County", "Lead project mismatch"
        
        print(f"✅ Get leads test PASSED (found {len(data['leads'])} leads)")
        return True
    except Exception as e:
        print(f"❌ Get leads test FAILED: {str(e)}")
        return False

def test_get_visits(expected_visit_id):
    """Test 7: GET /api/visits"""
    print("\n🔍 Testing Get Visits Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/visits", timeout=10)
        print_response("GET /api/visits", response)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert 'visits' in data, "Visits array missing"
        assert isinstance(data['visits'], list), "Visits should be an array"
        
        # Verify no _id in any visit
        for visit in data['visits']:
            assert '_id' not in visit, f"MongoDB _id found in visit: {visit}"
            assert 'id' in visit, f"UUID id missing in visit: {visit}"
        
        # Verify our created visit is present
        if expected_visit_id:
            visit_ids = [visit['id'] for visit in data['visits']]
            assert expected_visit_id in visit_ids, f"Created visit {expected_visit_id} not found in GET response"
            
            # Find and verify the visit
            created_visit = next((v for v in data['visits'] if v['id'] == expected_visit_id), None)
            assert created_visit is not None, "Created visit not found"
            assert created_visit.get('name') == "Priya Patel", "Visit name mismatch"
            assert created_visit.get('status') == "pending", "Visit status mismatch"
        
        print(f"✅ Get visits test PASSED (found {len(data['visits'])} visits)")
        return True
    except Exception as e:
        print(f"❌ Get visits test FAILED: {str(e)}")
        return False

def test_unknown_path():
    """Test 8: GET /api/unknown-path should return 404"""
    print("\n🔍 Testing Unknown Path (404)...")
    try:
        response = requests.get(f"{BASE_URL}/unknown-path", timeout=10)
        print_response("GET /api/unknown-path", response)
        
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        data = response.json()
        assert 'error' in data, "Error field missing"
        assert data.get('error') == 'Not found', "Error message mismatch"
        assert 'path' in data, "Path field missing"
        assert data.get('path') == '/unknown-path', "Path value mismatch"
        
        print("✅ Unknown path test PASSED")
        return True
    except Exception as e:
        print(f"❌ Unknown path test FAILED: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("\n" + "="*80)
    print("KP INFRA BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    results = {}
    
    # Test 1: Health endpoint
    results['health'] = test_health_endpoint()
    
    # Test 2: Create lead
    lead_id = test_create_lead()
    results['create_lead'] = lead_id is not None
    
    # Test 3: Create visit
    visit_id = test_create_visit()
    results['create_visit'] = visit_id is not None
    
    # Test 4: Brochure request
    brochure_id = test_brochure_request()
    results['brochure'] = brochure_id is not None
    
    # Test 5: Calculator
    calculator_id = test_calculator()
    results['calculator'] = calculator_id is not None
    
    # Test 6: Get leads
    results['get_leads'] = test_get_leads(lead_id)
    
    # Test 7: Get visits
    results['get_visits'] = test_get_visits(visit_id)
    
    # Test 8: Unknown path (404)
    results['unknown_path'] = test_unknown_path()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, passed_flag in results.items():
        status = "✅ PASSED" if passed_flag else "❌ FAILED"
        print(f"{test_name:20s}: {status}")
    
    print("="*80)
    print(f"Total: {passed}/{total} tests passed")
    print("="*80)
    
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)

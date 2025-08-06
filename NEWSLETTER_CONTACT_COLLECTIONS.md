# Newsletter and Contact Collections

This document describes the Newsletter and ContactUs collections that were added to store form submissions from the website.

## Collections Overview

### 1. Newsletter Collection (`newsletter`)

Stores email subscriptions from the newsletter signup form.

**Fields:**

- `email` (email) - Required, unique, indexed
- `status` (select) - subscribed/unsubscribed/pending (default: subscribed)
- `source` (text) - Where subscription came from (default: website)
- `ipAddress` (text) - Client IP address (auto-populated)
- `userAgent` (text) - Browser user agent (auto-populated)
- `createdAt` / `updatedAt` (timestamps) - Automatic

**Features:**

- Duplicate email prevention
- Automatic resubscription for previously unsubscribed users
- IP and user agent tracking for analytics
- Status management (subscribed/unsubscribed/pending)

### 2. ContactUs Collection (`contact-us`)

Stores contact form submissions from the contact page.

**Fields:**

- `name` (text) - Required
- `email` (email) - Required
- `message` (textarea) - Required
- `subject` (text) - Auto-generated or manual
- `status` (select) - new/in_progress/responded/closed (default: new)
- `priority` (select) - low/normal/high/urgent (default: normal)
- `responded` (checkbox) - Whether admin has responded (default: false)
- `responseNotes` (textarea) - Internal notes about response
- `ipAddress` (text) - Client IP address (auto-populated)
- `userAgent` (text) - Browser user agent (auto-populated)
- `createdAt` / `updatedAt` (timestamps) - Automatic

**Features:**

- Message validation (minimum 10 characters)
- Status workflow management
- Priority levels for triage
- Response tracking
- Internal notes for admin team

## API Endpoints

### Newsletter APIs

#### Subscribe to Newsletter

```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Thank you for subscribing to our newsletter!",
  "id": "newsletter_id"
}
```

#### Newsletter Admin Stats

```http
GET /api/admin/newsletter
```

**Response:**

```json
{
  "success": true,
  "stats": {
    "total": 150,
    "subscribed": 140,
    "unsubscribed": 8,
    "pending": 2
  },
  "recent": [...]
}
```

#### Bulk Newsletter Operations

```http
POST /api/admin/newsletter
Content-Type: application/json

{
  "action": "unsubscribe", // or "resubscribe", "delete"
  "emails": ["user1@example.com", "user2@example.com"]
}
```

### Contact APIs

#### Submit Contact Form

```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I have a question about your services..."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "id": "contact_id"
}
```

#### Contact Admin Stats

```http
GET /api/admin/contact
```

**Response:**

```json
{
  "success": true,
  "stats": {
    "total": 50,
    "new": 12,
    "inProgress": 5,
    "responded": 28,
    "closed": 5,
    "priorities": {
      "urgent": 2,
      "high": 8,
      "normal": 35,
      "low": 5
    }
  },
  "recent": [...]
}
```

#### Update Contact Status

```http
PATCH /api/admin/contact
Content-Type: application/json

{
  "id": "contact_id",
  "status": "responded",
  "priority": "high",
  "responded": true,
  "responseNotes": "Sent detailed reply via email"
}
```

## Frontend Integration

### Newsletter Component

The `NewsletterSection` component now includes:

- Form validation
- Loading states
- Success/error messages
- Email duplicate handling
- Form clearing on success

### Contact Component

The `ContactUsSection` component now includes:

- Client-side validation (name, email, message length)
- Loading states
- Success/error messages with styling
- Form clearing on success
- Disabled submit button during submission

## Admin Panel Integration

Both collections are automatically available in the Payload admin panel at `/admin`:

- **Newsletter** - View subscriptions, manage statuses, export data
- **Contact Us** - Manage inquiries, set priorities, track responses

## Data Privacy & Security

### Security Measures:

- Input validation on both client and server
- Email format validation
- Message length requirements
- IP address logging for abuse prevention
- User agent tracking for analytics

### Privacy Considerations:

- Minimal data collection (only necessary fields)
- IP addresses stored for security, not personal tracking
- Clear unsubscribe mechanism for newsletter
- Response tracking for customer service quality

## Usage Examples

### Newsletter Subscription

```javascript
// From NewsletterSection component
const response = await fetch("/api/newsletter", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "user@example.com" }),
});
```

### Contact Form Submission

```javascript
// From ContactUsSection component
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    message: "Hello, I need help with...",
  }),
});
```

## Database Schema

The collections are automatically created in MongoDB with the following structure:

### Newsletter Schema

```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  status: String (enum: ['subscribed', 'unsubscribed', 'pending']),
  source: String,
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

### ContactUs Schema

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  subject: String,
  status: String (enum: ['new', 'in_progress', 'responded', 'closed']),
  priority: String (enum: ['low', 'normal', 'high', 'urgent']),
  responded: Boolean,
  responseNotes: String,
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

Both APIs include comprehensive error handling:

### Newsletter Errors:

- Invalid email format
- Database connection issues
- Duplicate subscription handling

### Contact Form Errors:

- Missing required fields
- Invalid email format
- Message too short (< 10 characters)
- Network/server errors

All errors return appropriate HTTP status codes and user-friendly messages.

# Backend

## How to Run?

1. Install **MySQL** on your computer (if you don't have it already).

2. Navigate to the backend folder:
   ```bash
   cd backend
   ```

3. Create a `.env` file in the same directory as `.env.example`, and fill it with your MySQL connection details.  
   **Important:** Make sure to manually create the database specified in your `.env` file.

4. Setup and Launch

| Step                      | Linux / macOS                          | Windows                             |
|---------------------------|----------------------------------------|-------------------------------------|
| Create virtual environment| `python3 -m venv .venv`                | `python -m venv .venv`              |
| Activate environment      | `source .venv/bin/activate`            | `.venv\Scripts\activate`            |
| Install dependencies      | `pip3 install -r requirements.txt`     | `pip install -r requirements.txt`   |

5. Run the app
```bash
uvicorn main:app --reload
```
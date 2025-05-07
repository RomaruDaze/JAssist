from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import pytesseract
from PIL import Image
import io
import os
from typing import Optional
from app.core.config import settings

router = APIRouter()

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    try:
        # Read file content
        contents = await file.read()
        
        # Process based on file type
        if file.content_type.startswith('image/'):
            # Process image with OCR
            image = Image.open(io.BytesIO(contents))
            text = pytesseract.image_to_string(image, lang='jpn+eng')
            
            return JSONResponse({
                "message": "File processed successfully",
                "filename": file.filename,
                "content_type": file.content_type,
                "extracted_text": text
            })
            
        elif file.content_type == 'application/pdf':
            # TODO: Implement PDF processing
            return JSONResponse({
                "message": "PDF processing not implemented yet",
                "filename": file.filename,
                "content_type": file.content_type
            })
            
        else:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file type"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing file: {str(e)}"
        )
    finally:
        await file.close() 
from pydantic import ConfigDict
from pydantic_settings import BaseSettings
from urllib.parse import quote_plus

class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: str
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    @property
    def DATABASE_URL(self) -> str:
        password = quote_plus(self.DB_PASSWORD)
        return f"mysql+mysqlconnector://{self.DB_USER}:{password}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    model_config = ConfigDict(env_file=".env", env_file_encoding='utf-8')

settings = Settings()
print("SECRET_KEY from env:", settings.SECRET_KEY)  # 👈

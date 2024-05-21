import base64
import os


def image_to_base64(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        return "data:image/png;base64," + base64.b64encode(image_file.read()).decode("utf-8")


def get_from_relative_path(path: str) -> str:
    return os.path.abspath(path)
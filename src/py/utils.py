import base64
import os
import cv2


def image_to_base64(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        return "data:image/png;base64," + base64.b64encode(image_file.read()).decode("utf-8")


def get_from_relative_path(path: str) -> str:
    return os.path.abspath(path)


def generate_every_50th_frame(video_path: str):
    cap = cv2.VideoCapture(video_path)  # Opening the video file

    # Check if the video was opened successfully
    if not cap.isOpened():
        print("Error opening video stream or file")
        return

    frame_count = 0
    frame_number = 0

    while True:

        ret, frame = cap.read()  # Capture frame-by-frame

        if ret:
            frame_count += 1

            if frame_count % 50 == 0:
                frame_number += 1

                _, buffer = cv2.imencode('.png', frame)
                base64_frame = base64.b64encode(buffer).decode('utf-8')

                yield base64_frame  # Yield the frame number and base64 representation

        else:
            break

    cap.release()  # Release the video capture object


def stream_video_frames(video_path):
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error opening video stream or file")
        return

    while True:
        ret, frame = cap.read()

        if ret:
            _, buffer = cv2.imencode('.jpg', frame)
            base64_frame = base64.b64encode(buffer).decode('utf-8')

            print(base64_frame)

        else:
            break

    cap.release()

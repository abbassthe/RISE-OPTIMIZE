# from django.shortcuts import render

import os
import subprocess
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import shutil


@csrf_exempt  # Disable CSRF for simplicity, consider securing this in production
def upload_files(request):
    if request.method == "POST":
        readFiles(request)
        # input_files_dir = os.path.join(settings.INSECTS_ROOT, 'input_files')
        # if not os.path.exists(input_files_dir):
        #  os.makedirs(input_files_dir)

        processed_files_dir = os.path.join(settings.INSECTS_ROOT, "processed_files")
        if not os.path.exists(processed_files_dir):
            os.makedirs(processed_files_dir)
        # # Save each uploaded file to the processed_files directory
        # for file_key in request.FILES:
        #     file = request.FILES[file_key]
        #     file_path = os.path.join(input_files_dir, file.name)
        #     with open(file_path, 'wb+') as destination:
        #         for chunk in file.chunks():
        #             destination.write(chunk)

        # Run the Python scripts sequentially

        try:
            subprocess.run(
                [
                    "python",
                    os.path.join(settings.BASE_DIR, "insects", "MatrixGeneration.py"),
                ],
                check=True,
            )
            subprocess.run(
                ["python", os.path.join(settings.BASE_DIR, "insects", "TrainModel.py")],
                check=True,
            )
            subprocess.run(
                ["python", os.path.join(settings.BASE_DIR, "insects", "infer.py")],
                check=True,
            )

            # Read the output from the last script, assuming it writes to a text file
            with open(
                os.path.join(processed_files_dir, "species_similarity.txt"), "r"
            ) as output_file:
                output_data = output_file.read()
            input_path = "insects/input_files"
            output_path = "insects/processed_files"
            # Check if the directory exists before trying to delete it
            if os.path.exists(input_path):
                shutil.rmtree(input_path)
                print(f"Directory '{input_path}' has been deleted.")
            else:
                print(f"Directory '{input_path}' does not exist.")
            if os.path.exists(output_path):
                shutil.rmtree(output_path)
                print(f"Directory '{output_path}' has been deleted.")
            else:
                print(f"Directory '{output_path}' does not exist.")
            return HttpResponse(output_data, content_type="text/plain")
        except subprocess.CalledProcessError as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


def readFiles(request):
    input_files_dir = os.path.join(settings.INSECTS_ROOT, "input_files")
    if not os.path.exists(input_files_dir):
        os.makedirs(input_files_dir)
    for file_key in request.FILES.getlist("files"):
        #  file = request.FILES.getlist('files')[l]
        # l = l + 1
        file = file_key
        file_path = os.path.join(input_files_dir, file.name)
        with open(file_path, "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)

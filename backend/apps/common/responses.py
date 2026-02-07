from rest_framework.response import Response

def success(data=None, message="OK", status=200):
    return Response({"message": message, "data": data}, status=status)

def error(message="Error", status=400):
    return Response({"message": message}, status=status)

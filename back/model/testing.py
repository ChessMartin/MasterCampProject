import classify
import base64
import sys


imagePath = sys.argv[1]
result = classify.analyse(imagePath)

print(result)


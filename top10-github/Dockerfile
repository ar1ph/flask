FROM python:3.8

WORKDIR /top10

COPY . /top10

RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y netcat

EXPOSE 5000

ENTRYPOINT [ "/top10/entrypoint.sh" ]
#CMD ["python", "-m", "flask", "--app", "top10", "run", "--host=0.0.0.0"]
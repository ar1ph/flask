FROM python:3.8

WORKDIR /top10

COPY . /top10

RUN pip install -r requirements.txt

EXPOSE 5000

WORKDIR /

CMD ["python", "-m", "flask", "--app", "top10", "run", "--host=0.0.0.0"]
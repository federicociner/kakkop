BACKEND_CONTAINER=kakkop_backend_1
FRONTEND_CONTAINER=kakkop_frontend_1

reset-db:
	rm -rf data

django-shell:
	docker exec --user root -it $(BACKEND_CONTAINER) bash -c "python manage.py shell_plus"

lint:
	black backend --check

fix-lint:
	black backend && isort backend -m 3 -tc

migrate:
	docker exec --user root -it $(BACKEND_CONTAINER) bash -c "python manage.py migrate"

run:
	docker-compose up

stop:
	docker-compose down

#!/bin/bash
set -e;

# a default non-root role
MONGO_USER_ROLE="${MONGO_USER_ROLE:-readWrite}"

if [ -n "${MONGO_USER_USERNAME:-}" ] && [ -n "${MONGO_USER_PASSWORD:-}" ]; then
	"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
		db.createUser({
			user: $(_js_escape "$MONGO_USER_USERNAME"),
            pwd: $(_js_escape "$MONGO_USER_PASSWORD"),
			roles: [ { role: $(_js_escape "$MONGO_USER_ROLE"), db: $(_js_escape "$MONGO_INITDB_DATABASE") } ]
			})
	EOJS
else
  echo "Missing required env vars"
fi

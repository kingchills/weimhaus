#!/bin/bash
source ./.env
source ./.env.local

echo "Building for $APP_ENV"

echo "Enter new version number(2.0, 2.12, etc) then [ENTER], leave blank for current ($APP_VERSION):"
read version

if [ ! -z "$version" ]
then
sed -i -E "s/APP_VERSION=.*$/APP_VERSION=$version/" ./.env.local
fi

echo "Running Composer, cache:clear, asset:install"
if [ "$APP_ENV" = "prod" ]
then
    php /usr/local/bin/composer install --no-dev --optimize-autoloader
else
    php /usr/local/bin/composer install --optimize-autoloader
fi

echo "Installing JS packages"
yarn install

echo "Running migrations"
php bin/console --env=$APP_ENV doctrine:migrations:migrate --allow-no-migration --no-interaction

echo "Building assets"

if [ "$APP_ENV" = "prod" ]
then
yarn run encore production
else
yarn run encore dev
fi

echo "Done!"

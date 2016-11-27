#!/bin/sh
java -jar `dirname $0`/../jrebel.jar -activate "$@"

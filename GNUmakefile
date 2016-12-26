#Use tabs!

SHELL = /usr/bin/env bash

NODE_MODULES := ./node_modules
NPM_BIN := $(NODE_MODULES)/.bin

GULP ?= $(NPM_BIN)/gulp

export NIRS_ENV ?= development

$(info -- Переменные)
$(info * NIRS_ENV: $(NIRS_ENV))

default: build

build: libs
	node $(GULP) $(NIRS_ENV)

libs:
	$(info ===> Устанавливаем библиотеки)
	yarn install

clean:
	rm -rf node_modules

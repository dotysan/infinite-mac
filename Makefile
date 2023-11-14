SHELL:= /usr/bin/env bash

PY:= python3.11
vd:= .venv/bin/

node_modules: $(vd)npm
	source $(vd)activate && \
	npm install

$(vd)npm: $(vd)nodeenv
	source $(vd)activate && \
	nodeenv --python-virtualenv --node=lts && \
	npm install --global npm

$(vd)nodeenv: $(vd)wheel
	source $(vd)activate && \
	pip install nodeenv

$(vd)wheel: $(vd)activate
	source $(vd)activate && \
	pip install --upgrade pip setuptools wheel

$(vd)activate:
	$(PY) -m venv .venv

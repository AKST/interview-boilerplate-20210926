
PARCEL_OUT=./dist/parcel-dist
PARCEL_CACHE=./dist/parcel-cache
PARCEL_BIN=./node_modules/.bin/parcel
TSC_BIN=./node_modules/.bin/tsc
TSC_OUT=./dist/tsc-dist

start_fe: $(PARCEL_BIN) $(PARCEL_OUT) $(PARCEL_CACHE)
	$(PARCEL_BIN) serve ./fe/index.html \
		--dist-dir $(PARCEL_OUT) \
		--cache-dir $(PARCEL_CACHE)

start_be: $(TSC_BIN) $(TSC_OUT)
	$(TSC_BIN) \
		--project ./be/tsconfig.json \
		--rootDir ./be \
		--outDir $(TSC_OUT)
	node $(TSC_OUT)/index.js

dist/%:
	mkdir -p $@

node_modules/%:
	npm install

clean:
	rm -rf node_modules {fe,be}/node_modules dist

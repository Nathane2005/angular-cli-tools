#! /usr/bin/env node

var tools = require('./api/tools');

var component = process.argv.slice('2');
var name = component[1] ? component[1] : process.cwd().split('/').reverse()[0];

var paths = {
	baseTs : __dirname + '/base/module-ts.txt',
	ts : tools.prefix + name + '.module.ts',
};

var replace = tools.setupReplace(name);

if (tools.fileExists(paths.ts)) {
	tools.throwError('Module already exists!');
}

try {
	tools.copyBaseComponent(paths.baseTs, (paths.ts), function () {
		try {
			tools.replaceInFile(paths.ts, replace.query, replace.result, (paths.ts), function () {
				tools.updateIndex();
				tools.logSuccess('Created Module ' + name);
				tools.logSuccess('Created ' + paths.ts);
			});
		} catch (error) {
			throw error;
		}
	});
} catch (error) {
	throw error;
}

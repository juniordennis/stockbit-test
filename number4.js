const data = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'];
let groups = [];

for (let word of data) {
	let found = false;
	if (groups.length === 0) {
		groups.push([word]);
		continue;
	}
	groups.forEach(function(group, i, arr) {
		if (group[0].split("").sort().join("") === word.split("").sort().join("")) {
			arr[i].push(word);
			found = true;
			return;
		}
	});

	if (!found) {
		groups.push([word]);
	}
}

console.log(groups);
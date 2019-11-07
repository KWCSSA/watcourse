module.exports = () => {
	const year = new Date().getFullYear().toString().split('').map(digit => Number(digit));
	const month = new Date().getMonth() + 1;
	var currTermCode = `1${year[2]}${year[3]}`;
	if (month >= 1 && month <= 4) {
		currTermCode += '1';
	} else if (month >= 5 && month <= 8) {
		currTermCode += '5';
	} else if (month >= 9 && month <= 12) {
		currTermCode += '9';
	}
	var nextTermCode = '1';
	if (month >= 1 && month <= 8) {
		nextTermCode += year[2];
		nextTermCode += year[3];
		nextTermCode += Number(currTermCode[3]) + 4;
	} else if (month >= 9 && month <= 12) {
		if (year[3] + 1 > 9) {
			nextTermCode += year[2] + 1;
			nextTermCode += '01';
		} else {
			nextTermCode += year[2];
			nextTermCode += year[3] + 1;
			nextTermCode += '1';
		}
	}
	return {
		currTermCode: Number(currTermCode),
		nextTermCode: Number(nextTermCode)
	};
};


function hasBlacklistKeywords(bio) {
	const blacklist = [
		'ladyboy',
		'lady boy',
		'not a lady',
		'not lady',
		'not a girl',
		'not girl',
		'trans',
		'shemale',
		'chubby',
		//' lb ',
	];

	for (item of blacklist) {
		if (bio.toLowerCase().indexOf(item) !== -1) {
			console.log('skipping profile, matched blacklist keyword ' + item);
			return true;
		}
	}

	return false;
}

function hasValidProfile() {
	try {
		const bioContainer = document.querySelector('.profileCard .profileContent .profileCard__card .BreakWord');
		if (!bioContainer) return true;
		const bio = bioContainer.textContent;
		console.log(bio);
		return !hasBlacklistKeywords(bio);
	} catch (e) {
		// console.log(e);
		return true; // possible empty bio
	}
}

function checkTinder() {
	const base = "https://tinder.com/";
	return window.location.href.startsWith(base + "app/recs") || window.location.href.startsWith(base + "app/matches");
}

function isMatch() {
	return document.querySelector('a.active');
}

// prevent async execution
function pause(milliseconds) {
	const dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

function trickTinder() {
	const infoClassName = 'focus-button-style';
	const nbButtons = document.getElementsByClassName("button").length;
	const buttons = document.getElementsByClassName("button")

	const dislike = nbButtons === 5 ? buttons[1] : buttons[0];
	const like = nbButtons === 5 ? buttons[3] : buttons[2];

	// Open profile bio
// 	const info = document.getElementsByClassName(infoClassName)[0];
// 	if (info) {
// 		info.click();
// 	}
// 	pause(600);

// 	// Like or deslike depending on validation
// 	if (hasValidProfile()) {
// 		like.click();

// 		const thereIsMatch = isMatch();
// 		if (thereIsMatch) {
// 			console.log('------------- IT\'S A MATCH ! -------------');
// 			thereIsMatch.click();
// 		}
// 	} else {
// 		dislike.click();
// 	}
	
	like.click();

	const thereIsMatch = isMatch();
	if (thereIsMatch) {
		console.log('------------- IT\'S A MATCH ! -------------');
		thereIsMatch.click();
	}
	
	// If reached max likes per day then show modal and get it's content...
	// Check if there is any subscription button...
	if (document.getElementsByTagName('html')[0].innerHTML.search('Mua Tinder') != -1) {
		return 86400*1000;
	}
}

function checkOkCupid() {
	return window.location.href.startsWith("https://www.okcupid.com/doubletake");
}
function trickOkCupid() {
	// Press the like button
	document.getElementsByClassName('cardactions-action--like')[0].click();
}

// There is a lot more fun that can be achieved
// Need to add socket puppetry (VPNs solutions? several accounts?) - :D
// TODO: Need to accept automatically permissions except for
// TODO: Need to add ANN for fake pics
// TODO: Need to add RNN for fake messages

function getRandomPeriod() {
	return Math.round(Math.random() * (2000 - 500)) + 500;
}

(function loopSasori() {
	// A random period between 500ms and 2secs
	let randomPeriod = getRandomPeriod();
	var btns = document.getElementsByClassName("Pos(r) Z(1)");
	if (btns.length >= 10) {
		btns[9].click();
	}
	setTimeout(function () {
		randomPeriod = undefined;

		if (checkTinder()) {
			const delay = trickTinder();
			console.log(delay);
			if (delay) {
				console.log('Too many likes for now, have to wait: ' + delay + ' ms');
				randomPeriod = delay;
				console.log(randomPeriod);
			}
		} else if (checkOkCupid()) {
			trickOkCupid();
		}

		if (!randomPeriod) {
			loopSasori();
		} else {
			setTimeout(loopSasori, randomPeriod);
		}
	}, randomPeriod);
}());


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

function checkUpdateAccount() {
  if (document.getElementsByTagName('html')[0].innerHTML.search('Không, Cảm Ơn') != -1) {
		var allBtns = document.getElementsByClassName('button');
		var closeBtn = allBtns[allBtns.length-1];
		closeBtn.click();
	}
}

function runOutOfLike() {
  if (document.getElementsByTagName('html')[0].innerHTML.search('Bạn không còn lượt thích nào!') != -1) {
    console.log("Run out of like in function")
    return 1;
  }
  return 0;
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
	const mainPage = document.getElementsByClassName("recsPage")[0]
	const buttons = mainPage.getElementsByClassName("button")

	const dislike = buttons[1];
	const like = buttons[3];

	like.click();

	const thereIsMatch = isMatch();
	if (thereIsMatch) {
		console.log('------------- IT\'S A MATCH ! -------------');
		thereIsMatch.click();
	}

  // Check if ran out of likes
  if (runOutOfLike()) {
    console.log("Run out of like")
    return 86400*1000;
  }

  // Check if there is subscription modal
  checkUpdateAccount()

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

    const delay = trickTinder();
    console.log(delay);
    if (delay) {
      console.log('Too many likes for now, have to wait: ' + delay + ' ms');
      randomPeriod = delay;
      console.log(randomPeriod);
    }

		if (!randomPeriod) {
			loopSasori();
		} else {
			setTimeout(loopSasori, randomPeriod);
		}
	}, randomPeriod);
}());

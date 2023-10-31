class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement('img');

    this.addPlayer(imgSrc);
  }

  addPlayer(imgSrc) {
    // adding the player to the screen
    this.element.src = imgSrc;
    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    // update car position
    this.left += this.directionX;
    this.top += this.directionY;

    // prevent the car from leaving on the left side
    if (this.left < 10) {
      this.left = 10;
    }

    if (this.top < 10) {
      this.top = 10;
    }

    // handles the right side of the road
    // we use the road width minus the car width and minus the 10 margin
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    // handles the bottom position
    const bottomMaxValue = this.gameScreen.offsetHeight - this.height - 10;
    if (this.top > bottomMaxValue) {
      this.top = bottomMaxValue;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    // Get the bounding rectangle of the player element
    const playerRect = this.element.getBoundingClientRect();

    // Get the bounding rectangle of the obstacle element
    const obstacleRect = obstacle.element.getBoundingClientRect();

    // Check if there is an intersection between the player rectangle and the obstacle rectangle
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      // If there is an intersection, return true (indicating a collision)
      return true;
    } else {
      // If there is no intersection, return false (indicating no collision)
      return false;
    }
  }
}

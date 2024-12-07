import { data } from './data/data.js';

       
        export class Player {
            constructor(id, name, lastName, img, points) {
                this.id = id;
                this.name = name;
                this.lastName = lastName;
                this.img = img;
                this.points = points;
            }

           
            render(isFriend) {
                const element = document.createElement('div');
                element.classList.add('element-rating');

               
                if (isFriend) {
                    element.classList.add('friend-light');
                }

                element.innerHTML = `
                    <span class="element-rating__text" id="textIdSpan">${this.id}</span>
                    <img src="./public/map/rating/elementButtonRating.png" id="imgButtonRating"/>
                    <span class="element-rating__text" id="nameFriendSpan">${this.name} ${this.lastName}</span>
                    <span class="element-rating__text" id="qtExpSpan">${this.points}</span>
                `;
                return element;
            }

             showRatingWindow() {
                const wrapper = document.querySelector('.rating-window__wrapper');
                
               
                wrapper.classList.add('visible');
            }
            
             hideRatingWindow() {
                const wrapper = document.querySelector('.rating-window__wrapper');
            

                wrapper.classList.remove('visible'); 
            

                setTimeout(() => {
                    wrapper.classList.remove('visible');
                }, 500);
            }
            
        }

       
        class PlayerList {
            constructor(playersData, friendsData) {
                this.playersData = playersData;
                this.friendsData = friendsData;
                this.playerListElement = document.getElementById('playerList');
            }

            populate() {
                this.playersData.forEach(playerData => {
                    const isFriend = this.friendsData.some(friend => friend.id === playerData.id);
                    const player = new Player(
                        playerData.id,
                        playerData.name,
                        playerData.lastName,
                        playerData.img,
                        playerData.points
                    );

                    const playerElement = player.render(isFriend);
                    this.playerListElement.appendChild(playerElement);
                });
            }
        }

       
        const playerList = new PlayerList(data.rating, data.friends);
        playerList.populate();
export class Friends {
    constructor() {
        this.friends = [
            { id: '1', type: 'first' }, 
            { id: '2', type: 'standart' },
            { id: '3', type: 'standart' },
            { id: '4', type: 'standart' },
            { id: '5', type: 'standart' },
            { id: '6', type: 'standart' },
            { id: '7', type: 'empty' },
            { id: '8', type: 'empty' },
            { id: '9', type: 'empty' },
            { id: '10', type: 'standart' },
            { id: '11', type: 'empty' },
            { id: '12', type: 'standart' },
            { id: '13', type: 'empty' },
            { id: '14', type: 'standart' },
        ];
        this.startingPoint = 0;
        this.numberFriendList = 8;
        this.renderFriends();
    }

    renderFriends() {
        const friendsList = document.getElementById('friendsList');
        friendsList.innerHTML = '';

        const paginatedFriends = this.friends.slice(this.startingPoint, this.startingPoint + this.numberFriendList);
        
        paginatedFriends.forEach(friend => {
            if (friend.id === this.numberFriendList - 8) {
                const button = document.createElement('button');
                button.className = 'friend-icon__first'
                button.id = 'friend-icon__' + friend.type + '_id';
                friendsList.appendChild(button);
            }
            if (friend.id >= 0 && friend.id < this.friends.length + 1) {

                const button = document.createElement('button');
                button.className = 'friend-icon__' + friend.type;
                button.id = 'friend-icon__' + friend.type + '_id';
                friendsList.appendChild(button);
            }
        });
    }

    changingQtFriendDecrement() {
        if (this.startingPoint > 0) {
            this.startingPoint--;
            this.renderFriends();
        }
    }

    changingQtFriendIncrement() {
        if (this.startingPoint + this.numberFriendList < this.friends.length) {
            this.startingPoint++;
            this.renderFriends();
        }
    }
}

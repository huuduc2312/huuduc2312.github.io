const Peer = require('peerjs');
const uid = require('uid');
const $ = require('jquery');
const openStream = require('./openStream');
const playVideo = require('./playVideo');

    const peer = new Peer(
    	getPeer, 
    	{
    		config: {'iceServers': [
	    	{ url: 'stun:stun.l.google.com:19302' },
	    	{ url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
  		]} 
	}); 

    $('#btnCall').click(() => {
        const friendId = $('#txtFriendId').val();
        openStream(stream => {
            playVideo(stream, 'localStream');
            const call = peer.call(friendId, stream);
            call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
        });
    });

    peer.on('call', call => {
        openStream(stream => {
            console.log('123123123')
            playVideo(stream, 'localStream');
            call.answer(stream);
            call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
        });
    });

function getPeer() {
    const id = uid(10);
    $('#peer-id').append(id);
    return id;
}





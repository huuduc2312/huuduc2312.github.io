const Peer = require('peerjs');
const uid = require('uid');
const $ = require('jquery');
const openStream = require('./openStream');
const playVideo = require('./playVideo');
const getIceObject = require('./getIceObject');

getIceObject(iceConfig => {
    const connectionObj = {
        host: 'stream0407.herokuapp.com',
        port: 443,
        secure: true,
        key: 'peerjs',
        config: iceConfig
    };

    const peer = new Peer(getPeer(), connectionObj);

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

});

function getPeer() {
    const id = uid(10);
    $('#peer-id').append(id);
    return id;
}





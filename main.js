/*
  Enables piracy of music on YouTube pretty much.
*/

var downloader = {
  magicKey: 'videoplayback?',
  setPlayback: function (url) {
    this.url = url;
  },
  getHost: function () {
    return this.url.substring(this.url.indexOf(this.magicKey), 0)
  },
  getParameterList: function () {
    return this.url.substring(this.url.indexOf(this.magicKey)).replace(this.magicKey, '').split('&');
  },
  rebuildUrl: function (host, parameters) {
    var args = this.magicKey + 'e7398affd6e28a8087298e65e6df23f7=lol&';
    for (var index = 0; index < parameters.length; index++) {
      args = args + '&' + parameters[index];
    }
    return host + args;
  }
}

call = function (xhr) {
  if (typeof once == 'undefined') {
    setTimeout(function () {
      var url = xhr.responseURL.toString();
      if (url.indexOf(downloader.magicKey) > -1 && url.indexOf('rbuf') > -1 && url.indexOf('range') > -1 && url.indexOf('mime=audio') > -1 && url.length > 10) {
        downloader.setPlayback(url);
        var data = {
          host: downloader.getHost(),
          parameters: downloader.getParameterList()
        }

        for (var index = 0; index < data.parameters.length; index++) {
          if (data.parameters[index].split('=')[0].toString() == 'range') {
            data.parameters[index] = 'range=0-133713371337'; // data.parameters
          }
        }

        var stream = downloader.rebuildUrl(data.host, data.parameters);
        console.log(stream);
        var download = window.open(stream, "_blank", "toolbar=yes,scrollbars=no,resizable=no,top=500,left=500,width=400,height=400");
        if (!download || download.closed || typeof download.closed == 'undefined') {
          alert('Popup was blocked, please allow them for this to work!');
        } else {
          once = '<3';
          document.getElementsByClassName("ytp-play-button")[0].click();
        }
      }
    }, 1500);
  }
}

var oldSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function () {
  call(this);
  oldSend.apply(this, arguments);
}
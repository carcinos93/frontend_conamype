      var buildUrl = "Build";
      var loaderUrl = buildUrl + "/Web.loader.js";
      var config = {
        dataUrl: buildUrl + "/Web.data.gz",
        frameworkUrl: buildUrl + "/Web.framework.js.gz",
        codeUrl: buildUrl + "/Web.wasm.gz",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "ExpoMype",
        productVersion: "0.1",
      };

      var container = document.querySelector("#unity-container");
      var canvas = document.querySelector("#unity-canvas");
      var loadingBar = document.querySelector("#unity-loading-bar");
      var progressBarFull = document.querySelector("#unity-progress-bar-full");
      var fullscreenButton = document.querySelector("#unity-fullscreen-button");

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        container.className = "unity-mobile";
        config.devicePixelRatio = 1;
      } else {
        canvas.style.width = "1260px";
        canvas.style.height = "800px";
      }
      loadingBar.style.display = "block";

      var script = document.createElement("script");
      script.src = loaderUrl;
      script.onload = () => {
         $(canvas).on('click', function () {
             window.location.href = $.appUrl + "recepcion";
         });

        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
          loadingBar.style.display = "none";
          fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
        }).catch((message) => {
          alert(message);
        });
      };
      document.body.appendChild(script);












/*var buildUrl = "Build";
      var loaderUrl = buildUrl + "/fachada.loader.js";
      var config = {
        dataUrl: buildUrl + "/fachada.data.gz",
        frameworkUrl: buildUrl + "/fachada.framework.js.gz",
        codeUrl: buildUrl + "/fachada.wasm.gz",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "ExpoMype",
        productVersion: "0.1",
      };

      var container = document.querySelector("#unity-container");
      var canvas = document.querySelector("#unity-canvas");
      var loadingBar = document.querySelector("#unity-loading-bar");
      var progressBarFull = document.querySelector("#unity-progress-bar-full");
      var fullscreenButton = document.querySelector("#unity-fullscreen-button");

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        container.className = "unity-mobile";
        config.devicePixelRatio = 1;
      } else {
        canvas.style.width = "1260px";
        canvas.style.height = "800px";
      }
      loadingBar.style.display = "block";

      var script = document.createElement("script");
      script.src = loaderUrl;
      script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
          loadingBar.style.display = "none";
          fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
        }).catch((message) => {
          alert(message);
        });
      };
      document.body.appendChild(script);*/

function fadeIn() {
  var text = $(".content")
    .text()
    .replace(/^\s+|\s+$/g, "");
  var length = text.length;
  var i = 0;
  var txt;
  var html = [];
  var sp = 4;
  var delay = 3000;

  for (; i < length; i += sp) {
    txt = text.substring(i, i + sp);
    html.push(
      '<span class="c animated" style="animation-delay:' +
        delay +
        'ms">' +
        txt +
        "</span>"
    );
    delay += 90;
  }
  $(".content").removeClass("c").html(html.join(""));

  for (i = 0, length = html.length; i < length; i++) {
    !(function (i) {
      setTimeout(function () {
        $(".content").find(".animated").eq(i).addClass("fadeIn");
      }, i * 340);
    })(i);
  }
}

document.querySelector(".content").onclick = function () {
  document.querySelector("#heart").hidden = false;
  document.querySelector("body").style.backgroundColor = "#542246";
  document.querySelector("#heart").hidden = false;
  fadeIn();
};

const audioElement = document.getElementById("audio");

function playAudio() {
  audioElement.play();
}

document.addEventListener("click", playAudio);

var lyrics = "Lời bài hát của bài hát"; // Lời bài hát
var words = lyrics.split(" "); // Chia lời bài hát thành các từ

function updateTextAnimation() {
  requestAnimationFrame(updateTextAnimation);

  // Lấy từ hiện tại trong lời bài hát
  var currentWordIndex = Math.floor(audioElement.currentTime); // Lấy thời gian hiện tại của âm thanh
  var currentWord = words[currentWordIndex];

  // Điều khiển hiệu ứng chữ chạy dựa trên từ hiện tại trong lời bài hát
  var speed = currentWord.length / 3; // Điều chỉnh tốc độ chạy dựa trên độ dài của từ
  $(".content").css("animation-duration", speed + "s");
}

// Khi âm thanh bắt đầu phát
audioElement.addEventListener("play", function () {
  // Định nghĩa bộ phân tích âm thanh
  var audioContext = new AudioContext();
  var analyser = audioContext.createAnalyser();
  var source = audioContext.createMediaElementSource(audioElement);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  // Thiết lập thông số phân tích âm thanh
  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  // Cập nhật hiệu ứng chữ chạy theo âm thanh và lời bài hát
  function updateTextAnimation() {
    requestAnimationFrame(updateTextAnimation);

    // Lấy từ hiện tại trong lời bài hát
    var currentWordIndex = Math.floor(audioElement.currentTime);
    var currentWord = words[currentWordIndex];

    // Điều khiển hiệu ứng chữ chạy dựa trên từ hiện tại trong lời bài hát
    var speed = currentWord.length / 10; // Điều chỉnh tốc độ chạy dựa trên độ dài của từ
    $(".content").css("animation-duration", speed + "s");

    // Lấy dữ liệu phân tích âm thanh
    analyser.getByteFrequencyData(dataArray);

    // Tính toán giá trị trung bình của dữ liệu phân tích
    var average = 0;
    for (var i = 0; i < bufferLength; i++) {
      average += dataArray[i];
    }
    average /= bufferLength;

    // Điều chỉnh tốc độ chạy dựa trên dữ liệu phân tích âm thanh
    var speedMultiplier = average / 10; // Điều chỉnh tốc độ chạy dựa trên dữ liệu phân tích
    $(".content").css("animation-duration", speed * speedMultiplier + "s");
  }

  // Bắt đầu cập nhật hiệu ứng chữ chạy
  updateTextAnimation();
});

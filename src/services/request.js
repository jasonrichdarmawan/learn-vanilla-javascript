export default function request(onload, method, url) {
    var request = new XMLHttpRequest();
    request.onload = onload;
    request.open(method, url, true);
    request.send();
}
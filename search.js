<script>
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Vubm5haSIsImEiOiJjbHMzM2Vlam4wdGtuMmttdXBid3AwNmJ5In0.rEOk4QI4o5RpdEpbpe-U7g';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [139.6917, 35.6895], // 地図の中心点（例：東京）
        zoom: 10
    });

    // 検索機能を実装する関数
    function search() {
        var searchText = document.getElementById('search').value; // ユーザーが入力した検索クエリを取得
        var geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            encodeURIComponent(searchText) + '.json?access_token=' + mapboxgl.accessToken + '&limit=1';

        fetch(geocodingUrl) // Mapbox Geocoding APIにクエリを送信
            .then(response => response.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    var coordinates = data.features[0].geometry.coordinates;
                    map.flyTo({ center: coordinates, zoom: 15 }); // 検索結果の位置に地図を移動

                    // 検索結果の位置にマーカーを設置
                    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
                } else {
                    alert('検索結果が見つかりませんでした。');
                }
            });
    }
</script>

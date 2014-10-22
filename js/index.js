/** @jsx React.DOM */

var PricingForm = React.createClass({
  getInitialState: function() {
    var self = this
function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log(results);
            var address = (results[0].formatted_address);
            self.refs.departureAddress.getDOMNode().value = address
        }
    });
}
navigator.geolocation.getCurrentPosition(function(position) {
  getReverseGeocodingData(position.coords.latitude, position.coords.longitude);
})
    return {
        departureDate: new Date().toISOString().substring(0, 10),
        departureTime: moment().format('HH:mm'),
        currentAddress: window.currentAddress
    };
  },
  handleDepartureDateValueChange: function(event) {
    this.setState({departureDateValue: event.target.value});
  },
  handleDepartureTimeValueChange: function(event) {
    this.setState({departureTimeValue: event.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var departureDate = this.refs.departureDate.getDOMNode().value.trim();
    var departureTime = this.refs.departureTime.getDOMNode().value.trim();
    var departureAddress = this.refs.departureAddress.getDOMNode().value.trim();
    var destinationAddress = this.refs.destinationAddress.getDOMNode().value.trim();
    var passengers = this.refs.passengers.getDOMNode().value.trim();
    var bags = this.refs.bags.getDOMNode().value.trim();

    console.log(departureAddress, destinationAddress)

    distance.get(
      {
        origin: departureAddress,
        destination: destinationAddress
      },
      function(err, data) {
        if (err) return console.log(err);
        var price = 3.79;
        console.log(data);
        var distance = data.distanceValue/1000;
        var duration = data.durationValue/60;
        var price = distance * 1.04 + duration * 32.25/60
        console.log(price)
    });

    return;
  },
  render: function() {
    var departureDateValue = this.state.departureDate;
    var departureTimeValue = this.state.departureTime;
    var currentAddressValue = this.state.currentAddress;
    var price = this.state.price || 0;
    return (
      <div>
      <form role="form" onSubmit={this.handleSubmit}>

      <div className="form-group">
      <label>Date de départ</label>
      <input className="form-control" value={departureDateValue} onChange={this.handleDepartureDateValueChange} type="date" ref="departureDate" required />
      </div>

      <div className="form-group">
      <label>Heure de départ</label>
      <input className="form-control" value={departureTimeValue} onChange={this.handleDepartureTimeValueChange} type="time" ref="departureTime" required />
      </div>

      <div className="form-group">
      <label>Adresse de départ</label>
      <input className="form-control" value={currentAddressValue} type="text" ref="departureAddress" required />
      </div>

      <div className="form-group">
      <label>Adresse d'arrivée</label>
      <input className="form-control" type="text" ref="destinationAddress" required />
      </div>

      <div className="form-group">
      <label>Nombre de passagers</label>
      <input className="form-control" type="text" ref="passengers" min="0" max="10" />
      </div>

      <div className="form-group">
      <label>Nombre de bagages (>5kg)</label>
      <input className="form-control" type="text" ref="bags" min="0" max="10" />
      </div>

      <button type="submit" className="btn btn-primary btn-lg btn-block">Calculer le prix de la course</button>

      </form>

      <div className="well">{price} €</div>

      </div>
      );
}
});


React.renderComponent(
  <PricingForm />,
  document.getElementById('pricing-form')
  );

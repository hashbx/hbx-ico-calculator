        $(document).ready(function () {

            $('#avg_popover').popover({
                container: 'body'
            })

            var configs = {
                "bitcoin": {
                    "avg_block": 1,
                    "reward": 12.5
                },
                "bitcoin-cash": {
                    "avg_block": 1,
                    "reward": 12.5
                },
                "litecoin": {
                    "avg_block": 1,
                    "reward": 25
                },
                "dash": {
                    "avg_block": 1,
                    "reward": 3.6
                }
            };

            var ticker_name = $('#ticker').val();
            var avg_block_per_day = $('#avg_block').val();

            var maintenance_fee = 0.4; // 40%

            var accept_token = 1 - maintenance_fee;

            var total_token = 0;
            var coin_mining = 0;
            var coin_price = 0;
            var hbx_holding = 0;

            // calc
            var token_holding_percent = 0;
            var coin_to_usd = 0;
            var token_profit = 0;

            get_coin_price();
            get_profit();

            function get_profit() {

                total_token = $('#total_token').val();
                coin_mining = $('#coin_mining').val();
                coin_price = $('#coin_price').val();
                hbx_holding = $('#hbx_holding').val();
                avg_block_per_day = $('#avg_block').val();

                token_holding_percent = (hbx_holding / total_token) * 100;
                coin_to_usd = coin_mining * coin_price;
                token_profit = ((token_holding_percent / 100) * coin_to_usd) * avg_block_per_day;

            }

            $('#ticker').change(function () {

                ticker_name = $('#ticker').val();

                console.log();

                $('#avg_block').val(configs[$(this).val()].avg_block);
                $('#coin_mining').val(configs[$(this).val()].reward);

                get_coin_price();

            })

            $('#calculate').click(function () {

                get_profit();

                var profit_per_day = (token_profit * accept_token).toFixed(2);

                $('#holding_percentage').text(token_holding_percent);
                $('#maintenance_fee').text((token_profit * maintenance_fee).toLocaleString('en'));

                $('#profit_per_day').text((profit_per_day * 1).toLocaleString('en'));
                $('#profit_per_month').text((profit_per_day * 30).toLocaleString('en'));
                $('#profit_per_year').text((profit_per_day * 365).toLocaleString('en'));

            });

            function get_coin_price() {

                $.get("https://api.coinmarketcap.com/v1/ticker/" + ticker_name + "/?convert=USD",
                    function (data, status) {
                        if (status == 'success') {
                            $('#coin_price').val(data[0]['price_usd']);
                        } else {
                            alert("Get price of Bitcoin cash failed");
                        }

                    }
                );
            }

        });
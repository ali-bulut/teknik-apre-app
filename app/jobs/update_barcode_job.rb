class UpdateBarcodeJob < ApplicationJob

  def perform(barcode, barcode_params, base_url)
    update_status = barcode.update_barcode(barcode_params, base_url)

    if update_status
      Pusher.trigger(ENV.fetch('PUSHER_CHANNEL_NAME'), 'update-barcode', {
        message: "Barcode successfully updated!"
      })
    else
      Pusher.trigger(ENV.fetch('PUSHER_CHANNEL_NAME'), 'update-barcode', {
        error: "Barcode could not be updated!"
      })
    end
  end
end
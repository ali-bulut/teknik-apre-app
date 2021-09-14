class CreateExcelJob < ApplicationJob

  def perform(party_id)
    excel_path = ExcelCreator.call(party_id: party_id)
    if excel_path
      Pusher.trigger(ENV.fetch('PUSHER_CHANNEL_NAME'), 'create-excel', {
        url: excel_path
      })
    else
      Pusher.trigger(ENV.fetch('PUSHER_CHANNEL_NAME'), 'create-excel', {
        error: "Excel file cannot be created"
      })
    end
  end
end
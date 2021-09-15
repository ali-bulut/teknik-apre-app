class ExcelCreator
  def initialize(party_id:)
    @party_id = party_id
  end

  def self.call(*args)
    new(*args).send(:create_excel)
  end

  private

  def create_excel
    party = Party.find(@party_id)

    book = Spreadsheet::Workbook.new
    sheet = book.create_worksheet(name: "Parti-#{party.party_num}")

    format = Spreadsheet::Format.new
    format.font = Spreadsheet::Font.new('Arial', :bold => true)

    sheet.row(0).push("Roll No")
    party.barcode.template.template_values.map.with_index do |template_value, index|
      sheet.row(0).push(template_value.column_name.titleize)
    end

    party.party_line_items.order(line_item_num: "ASC").map.with_index do |line_item, index|
      sheet.row(index + 1).push(line_item.line_item_num.to_s)

      party.barcode.barcode_main_values.map do |main_value|
        sheet.row(index + 1).push(main_value.value.to_s)
      end

      line_item_values = PartyLineItemValue.where(party_line_item_id: line_item.id).order(template_value_id: "ASC").all
      line_item_values.map do |l_i_value|
        sheet.row(index + 1).push(l_i_value.value.to_f)
      end
    end

    sheet.row(0).default_format = format

    barcode_name = party.barcode.name.delete(' ')
    barcode_id = party.barcode.id.to_s

    party_num = "Party-#{party.party_num.to_s}"

    html_dir = Rails.root.join('public', 'excel_files', barcode_id)
    FileUtils.mkdir_p(html_dir) unless File.exist?(html_dir)
    excel_name = "#{barcode_name}-#{party_num}-#{Time.now.to_i}.xls"
    excel_path = html_dir + excel_name

    book.write excel_path
    "excel_files/#{barcode_id}/#{excel_name}"
  end
end
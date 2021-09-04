class CreatePartyLineItemValues < ActiveRecord::Migration[6.0]
  def change
    create_table :party_line_item_values do |t|
      t.string :value
      t.references :template_value, null: false, foreign_key: true
      t.references :party_line_item, null: false, foreign_key: true

      t.timestamps
    end
  end
end

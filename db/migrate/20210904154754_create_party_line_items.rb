class CreatePartyLineItems < ActiveRecord::Migration[6.0]
  def change
    create_table :party_line_items do |t|
      t.integer :line_item_num
      t.text :html_path
      t.references :party, null: false, foreign_key: true

      t.timestamps
    end
  end
end

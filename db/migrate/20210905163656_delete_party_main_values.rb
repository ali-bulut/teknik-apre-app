class DeletePartyMainValues < ActiveRecord::Migration[6.0]
  def change
    drop_table :party_main_values
  end
end

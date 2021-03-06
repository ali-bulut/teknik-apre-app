# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

template_1 = Template.create!({
                                name: "Varsayılan Şablon",
                                description: "Barkod için kullanılan varsayılan şablondur.",
                                html_path: "barcode_templates/default_template.html.erb",
                                image_path: "barcode_template_images/default_template_img.jpg"
                              })
p "SEED: Template-1 Created!"

template_2 = Template.create!({
                                name: "En Girilebilen Şablon",
                                description: "Barkod için kullanılan el ile en girilebilen şablondur.",
                                html_path: "barcode_templates/template_with_width.html.erb",
                                image_path: "barcode_template_images/template_with_width_img.jpg"
                              })
p "SEED: Template-2 Created!"

template_1.template_values.create!([
                                     {
                                       column_name: "supp",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "order",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "ref ind",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "destination",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "col",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "description",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "comp",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "width",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "gross kg",
                                       is_calculated: true,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "net kg",
                                       is_calculated: true,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "gross mt",
                                       is_calculated: true,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "net mt",
                                       is_calculated: false,
                                       is_entered: true
                                     }
                                   ])
p "SEED: Template-1 Values Created!"

template_2.template_values.create!([
                                     {
                                       column_name: "tedarikci",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "malzeme kodu",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "model",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "grm",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "taha sip no",
                                       is_calculated: false,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "en",
                                       is_calculated: false,
                                       is_entered: true
                                     },
                                     {
                                       column_name: "net kg",
                                       is_calculated: true,
                                       is_entered: false
                                     },
                                     {
                                       column_name: "net mt",
                                       is_calculated: false,
                                       is_entered: true
                                     }
                                   ])
p "SEED: Template-2 Values Created!"

Role.create!([{
                name: "admin",
              },
              {
                name: "staff",
              },
              {
                name: "customer",
              },
             ])
p "SEED: Roles Created!"

user = User.create({
                     provider: "email",
                     uid: "hilmi@teknikapre.com",
                     username: "teknikapre",
                     email: "hilmi@teknikapre.com",
                     password: "28092002",
                     password_confirmation: "28092002"
                   })
p "SEED: Default Admin User Created!"

user.add_role :admin
p "SEED: Default User Assigned to Admin Role!"

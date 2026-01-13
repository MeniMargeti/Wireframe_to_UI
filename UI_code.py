def render_component (component_data):
    if component_data.get("type")=="Image":
        return f"<img src=\"{component_data.get('url')}\" alt=\"Avatar\" className=\"{component_data.get('name')}\" loading=\"lazy\"/>"
    elif component_data.get("type")=="Text":
        return f"<div className=\"{component_data.get('name')}\" >{component_data.get('content')}</div>"
    elif component_data.get("type")=="Background_Button":
        return  f"<PrimaryBackgroundButton className=\"{component_data.get('name')}\" title=\"{component_data.get('label')}\"  />"
    elif component_data.get("type")=="Border_Button":
        return  f"<PrimaryBorderButton className=\"{component_data.get('name')}\" title=\"{component_data.get('label')}\"/>"
    elif component_data.get("type") == "Input":
        if component_data.get("label") is None:
            return f"<Input className=\"{component_data.get('name')}\" title=\"{component_data.get('name')}\" />"
        else:
            return f"<Input className=\"{component_data.get('name')}\" title=\"{component_data.get('name')}\" label=\"{component_data.get('label')}\"/>"
    elif component_data.get("type") == "Dropdown":
        return f"<PrimaryBackgroundDropdown className=\"{component_data.get('name')}\" placeholder=\"{component_data.get('label')}\"  items={{{component_data.get('items')}}} value={{dropdownValue}} onChange={{handleDropdown}}/>"
    elif component_data.get("type") == "Checkbox":
        return f"<Checkbox className=\"{component_data.get('name')}\" checked={{isChecked}}  onChange={{handleCheckbox}}/>"
    elif component_data.get("type") == "Card":
        if component_data.get("children") is None:
            return f"<Card className=\"{component_data.get('name')}\" title==\"{component_data.get('name')}\"/>"
        else :
            children_list=[]
            for child in component_data.get("children"):
                children=render_component(child)
                children_list.append(children)
            children_final="\n".join(children_list)
            return  f"""<Card className=\"{component_data.get('name')}\" title=\"{component_data.get('name')}\" >
        {children_final}
      </Card>"""
    elif component_data.get("type") == "Switch":
        return f"<Switch className=\"{component_data.get('name')}\" checked={{isChecked}} onChange={{handleSwitch}}/>"
    elif component_data.get("type") == "Table":
        return f"<Table className=\"{component_data.get('name')}\" \n\t\t columns={{{component_data.get("name")}_columns}} \n\t\t data={{{component_data.get("name")}_data}}\n\t\t noDataText={{isLoading ? \"Fetching data...\" : \"No data available!\"}}  \n\t\t defaultSorted={{[{{ id: \"name\", desc: true }}]}} />"
    return

def render_grid_placement(component_data,Parent):
    placement = component_data.get("placement")
    columns = placement.get("columns")
    rows = placement.get("rows")
    name = component_data.get("name").strip('"')
    if component_data.get("children") is None:
        if component_data.get('type') == "Image":
            return f""".{name}{{
grid-column:{columns};
grid-row:{rows};
width:100%;
height:100%;
}}"""
        else: return f""".{name}{{
grid-column:{columns};
grid-row:{rows};
}}"""
    else : 
        children_list = []
        for child in component_data.get("children"):
            children_placement=render_grid_placement(child,name)
            children_list.append(children_placement)
        children_final_placement="\n".join(children_list)
        
        return f""".{name}{{
grid-column:{columns};
grid-row:{rows};
}}
.{name}_Grid{{
display: grid;
grid-template-columns: repeat(13, 1fr);
grid-template-rows: repeat(10, minmax(0, 1fr));
width: 100%;
height: 100%;
min-height: 0;
}}
{children_final_placement}""" 



# def map_x_to_column(x,fr):
#     z = x / fr
#     if z == 0:
#         return 1
#     else:
#         return (z + 1) // 2 + 1

# def map_y_to_row(y,fr):
#     z = y / fr
#     if z == 0:
#         return 1
#     else:
#         return (z + 1) // 2 + 1

# def render_grid_placement (component_data,Parent): # for the deterministic placement
#     bbox = component_data.get("absoluteBoundingBox")
#     x = bbox.get("x")
#     y = bbox.get("y")
#     width = bbox.get("width")
#     height = bbox.get("height")
#     if Parent==None:
#         start_column = map_x_to_column(x,80)
#         end_column = map_x_to_column(x+width,80)
#         if start_column==end_column:
#             end_column=end_column+1

#         start_row = map_y_to_row(y,24)
#         end_row = map_y_to_row(y+height,24)
#         if start_row==end_row:
#             end_row=end_row+1
#             # start_row = y
#         # end_row = y + height
#     else:
#         start_column = map_x_to_column(x-Parent[0],Parent[2]/24)
#         end_column = map_x_to_column(x-Parent[0]+width,Parent[2]/24)
#         if start_column==end_column:
#             end_column=end_column+1

#         start_row = map_y_to_row(y-Parent[1]-44,(Parent[3]-44)/20)
#         end_row = map_y_to_row(y-Parent[1]+height-44,(Parent[3]-44)/20)
#         if start_row==end_row:
#             end_row=end_row+1
#     component_css_name = component_data.get("name").strip('"')
#     css_list = []
#     css_list.append(f'grid-column:{int(start_column)}/{int(end_column)};')
#     css_list.append(f'grid-row:{int(start_row)}/{int(end_row)};') 
#     css_string = "\n".join(css_list)
#     if component_data.get("children") is None:
#         return f".{component_css_name} {{ \n{css_string} }}"  
#     else :
#         children_list=[]
#         for child in component_data.get("children"):
#             children_placement=render_grid_placement(child,[x,y,width,height])
#             children_list.append(children_placement)
#         children_final_placement="\n".join(children_list)
#         return f"""
# .{component_css_name} {{ \n{css_string} }}
# .{component_css_name}_Grid{{
# display: grid;
# grid-template-columns: repeat(13, 1fr);
# grid-template-rows: repeat(10, minmax(0, 1fr));
# width: 100%;
# height: 100%;
# min-height: 0;
# }}
# {children_final_placement}"""
